import sys
import os
import subprocess
from subprocess import call

MARKETLIVE_HOME = os.environ["MARKETLIVE_HOME"]
TOMCAT  = MARKETLIVE_HOME + "/tomcat/apache-tomcat-7.0.52/bin/"

def run(command): # runs the command in shell w/ lolcat
    subprocess.call([command + " | lolcat"], shell=True)

def log(quote):
    print "*********************************************************"
    print "                   " + quote
    print "*********************************************************"

def shutdown(site, solr, iws):
    log("Shutting down solr...")
    run(TOMCAT + "shutdown.sh " + solr + " --force")
    log("Shutting down site...")
    run(TOMCAT + "shutdown.sh " + site + " --force")

def deployClean(site):
    log("Running clean deploy of site...")
    command = "cd ~/marketlive/sites/" + site + "/trunk/source/ant/;"
    command += "ant deployClean -Ddeploy.name=" + site
    run(command)

def startup(site, solr, iws):
    log("Starting solr....")
    run(TOMCAT + "startup.sh " + solr)
    log("Starting site...")
    run(TOMCAT + "startup.sh " + site)

def rebuild(site, solr, iws):
    shutdown(site, solr, iws)
    deployClean(site)
    startup(site, solr, iws)

def restart(site, solr, iws):
    shutdown(site, solr, iws)
    startup(site, solr, iws)

options = {
    'startup': startup,
    'shutdown': shutdown,
    'deployClean': deployClean,
    'rebuild': rebuild,
    'restart': restart
}

if __name__=="__main__":
    num_args = len(sys.argv)
    command = sys.argv[1]
    site = sys.argv[2]
    solr = site + '-solr'
    iws = site + '-iws'
    options[command](site, solr, iws)
