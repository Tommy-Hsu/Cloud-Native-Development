from datetime import datetime, timedelta


ONE_DAT_DELTA = timedelta(days=1)
TWO_DAY_DELTA = timedelta(days=2)


def GetLeftTime(endDate: datetime):
    endDate = datetime.strptime(endDate, "%Y %m %d")
    leftTime = endDate - datetime.now()
    if leftTime < TWO_DAY_DELTA:
        template = "%d day, %H:%M:%S"
    elif leftTime < ONE_DAT_DELTA:
        template = "%H:%M:%S"
    else:
        template = "%d days, %H:%M:%S"

    return datetime.strftime(datetime.strptime(str(leftTime).split('.')[0], template), "%Y %m %d %H %M %S")


