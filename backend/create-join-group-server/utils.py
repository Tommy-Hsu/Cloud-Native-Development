from datetime import datetime, timedelta


ONE_DAT_DELTA = timedelta(days=1)
TWO_DAY_DELTA = timedelta(days=2)


def GetLeftTime(endDate: str):
    endDate = datetime.strptime(endDate, "%Y %m %d")
    leftTime = endDate - datetime.now()
    print(leftTime)
    if leftTime < ONE_DAT_DELTA:
        days, times = "0", str(leftTime).split('.')[0]
    else:
        days, times = str(leftTime).split(', ')
        days, times = days.replace(" day", ""), str(times).split('.')[0]

    return (days + " " + " ".join(times.split(':'))).replace("s", "")
