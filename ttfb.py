import sys
import urllib2
import lxml.html
import re
import xlsxwriter
import subprocess
from subprocess import call
# from browsermobproxy import Server
from selenium import webdriver

# before running this script, do the following:
#       sudo easy_install pip
#       pip install selenium
#       install Google Chrome Driver from:
#           https://sites.google.com/a/chromium.org/chromedriver/downloads
#       move the google chrome driver .exe to /usr/local/bin/
#       pip install lxml
#       pip install XlsxWriter
#       pip install pyCurl
#       pip install browsermob-proxy

# TODO: use browsermobproxy for monitoring network traffic (data transfer)
# TODO: organize excel file by categories and subcategories
# TODO: clear cache by bash script instead of recreating driver each time
# TODO: try Firefox driver instead of Chrome driver
# TODO: add a pause to ensure the page actually finishes loading

# run: python ttfb.py <url> <options>

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def get_hyperlinks(baseurl):
    connection = urllib2.urlopen(baseurl)
    dom = lxml.html.fromstring(connection.read())
    hyperlinks = []
    for link in dom.xpath('//a/@href'):
        hyperlinks.append(link)
    # matches categories and primary subcategories
    regex = re.compile(r'\/category(\/[^\/]*)?\/[^\/]*do$')
    hyperlinks = filter(lambda x: regex.match(x), hyperlinks)
    # add home page
    hyperlinks.append('/home.do')
    hyperlinks = list(set(hyperlinks))  # return distinct
    hyperlinks.sort()
    return hyperlinks


def get_stats_sel(url):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--incognito")  # delete cache
    driver = webdriver.Chrome(chrome_options=chrome_options)
    driver.get(url)

    domComplete = "window.performance.timing.domContentLoadedEventEnd"
    fetchStart = "window.performance.timing.fetchStart"
    responseStart = "window.performance.timing.responseStart"
    loadEnd = "window.performance.timing.loadEventEnd"

    ttfb = driver.execute_script(
        "return " + responseStart + " - " + fetchStart)
    domContentLoaded = driver.execute_script(
        "return " + domComplete + " - " + fetchStart)
    load = driver.execute_script("return " + loadEnd + " - " + fetchStart)
    pageType = get_page_type(url, driver)

    driver.quit()

    return ttfb, domContentLoaded, load

# TODO: can this be rewritten?
def get_page_type(url, driver):
    # get_page_type: loops through document until Page Type is found
    # The line in the document will look like this:
    # MarketLive.Reporting.templateType = 'INDEX';
    page = driver.page_source
    pagetype = ""
    try: # TODO: some documents don't appear to have this...
        index = page.find("MarketLive.Reporting.templateType")
        x = 37
        currentChar = page[index + x]

        while (currentChar != "'"):  # until we get to the '
            type += currentChar
            x += 1
            currentChar = page[index + x]
    except:
        print("Unexpected error:", sys.exc_info()[0])

    return pagetype

def get_avg_stats_sel(url, sample_size):
    ttfb_total, domContent_total, load_total = 0, 0, 0
    for i in range(0, sample_size):
        stats = get_stats_sel(url)
        ttfb_total += stats[0]
        domContent_total += stats[1]
        load_total += stats[2]
        # pageType = stats[3]
    return ttfb_total / sample_size, domContent_total / sample_size,
    load_total / sample_size


def print_error_message(error):
    print
    print "usage: python ttfb.py <url> <sample-size>"
    print bcolors.BOLD + bcolors.FAIL + "error: " + error + bcolors.ENDC
    print
    sys.exit(1)


def clear_cache_chrome():
    subprocess.call(["@echo off"], shell=True)
    subprocess.call(["set ChromeDir=C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data"], shell=True)
    subprocess.call(['del /q /s /f "%ChromeDir%"'], shell=True)
    subprocess.call(['rd /s /q "%ChromeDir%"'], shell=True)

if __name__ == "__main__":
    # validate arguments
    num_args = len(sys.argv)

    # At least one argument is required; Second argument must be a digit
    if num_args > 3 or num_args == 1:
        print_error_message("Must provide a valid argument")
    elif num_args == 3:
        if not sys.argv[2].isdigit():
            print_error_message("Second argument must be a digit")

    # extract arguments
    baseurl = sys.argv[1]
    sample_size = int(sys.argv[2]) if num_args > 2 else 1

    # format workbook
    workbook = xlsxwriter.Workbook('SteinmartCSPerformance.xlsx')
    worksheet = workbook.add_worksheet()
    bold = workbook.add_format({'bold': True})

    # write headers
    headers = ['URL', 'TTFB', 'DOM', 'Total', 'Data Transferred']
    for idx, header in enumerate(headers):
        worksheet.write(0, idx, header, bold)

    row, col, ttfb = 1, 0, ""
    dcl_time, load_time = 0, 0
    stats = []

    # write data
    for link in get_hyperlinks(baseurl):
        worksheet.write(row, 0, link)
        while True:
            stats = get_avg_stats_sel(baseurl + link, sample_size)
            if stats[2] < 6000:
                break
        ttfb = str(stats[0]) + 'ms'
        dom_time = str(stats[1]) + 'ms'
        load_time = str(stats[2]) + 'ms'
        # page_type = str(stats[3])
        worksheet.write(row, 1, ttfb)  # ttfb
        worksheet.write(row, 2, dom_time)  # dom
        worksheet.write(row, 3, load_time)  # load
        print link + ' ' + ttfb + ' ' + dom_time + ' ' + load_time
        row += 1

    workbook.close()
