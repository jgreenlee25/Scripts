import subprocess
from subprocess import call

def clear_cache():
    subprocess.call(["set ChromeDir=/Users/*/Library/Caches/Google/Chrome/Default/Cache"], shell=True)
    subprocess.call(['rm -rf "%ChromeDir%"'], shell=True)
    # subprocess.call(['rd /s /q "%ChromeDir%"'], shell=True)

if __name__=="__main__":
    clear_cache()
