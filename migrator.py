import subprocess
import os


def apply_migration() -> None:
    try:
        os.system("dbmate --url 'sqlite:db.sqlite3' --wait migrate --strict")
    except subprocess.CalledProcessError:
        print("error from dbmate")
        exit(1)


def check_migrator_status() -> None:
    try:
        returned_output = subprocess.check_output(["dbmate", "--url", "sqlite:db.sqlite3", "--wait", "status"])
        result = returned_output.decode("utf-8").__contains__("Pending: 0")
        if result:
            return
        apply_migration()
        check_migrator_status()
    except subprocess.CalledProcessError:
        print("error from dbmate")
        exit(1)


if __name__ == "__main__":
    check_migrator_status()
