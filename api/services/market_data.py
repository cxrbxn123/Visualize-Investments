import yfinance as yf

def get_stock_data(symbol: str, start: str, end: str):
    ticker = yf.Ticker(symbol)
    data = ticker.history(
        start=start,
        end=end,
        auto_adjust=False 
        # so data does not adjust to dividends and stock splits
    )
    # pulls first day open and last day close price

    # auto rounds up to nearest open (if start day is a saturday it will open the next monday) and down to nearest close
    start_day = data.iloc[0]
    end_day = data.iloc[-1]
    return {
        "start_date": str(data.index[0].date()),
        "start_price": start_day["Close"],
        "end_date": str(data.index[-1].date()),
        "end_price": end_day["Close"]
    }