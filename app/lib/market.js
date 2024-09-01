import axios from "axios";

export const getPriceInUSD = async () => {
  try {
    let rate = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    return rate.data.bpi.USD.rate_float;
  } catch (error) {
    console.error(error.message);

    return 0;
  }
};
