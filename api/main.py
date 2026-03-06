from services.market_data import get_stock_data
def main():
    print("Investment test\n")

    data = get_stock_data(
        # temp test
        symbol="AAPL",
        start="2017-01-01",
        end="2024-01-01"
    )

    print("success\n")
    print(data)


if __name__ == "__main__":
    main()