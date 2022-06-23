const axios = require("axios");

const main = async () => {
  const url = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";
  const result = await axios.post(url, {
    query: `
        {
            flashLoans(first: 10, orderBy: timestamp, orderDirection: desc) {
                id
                reserve {
                    name
                    symbol
                }
            amount
            target
            timestamp
        }
    }
    `,
  });

  result.data.data.flashLoans.forEach((element) => {
    const formatted = {
      ...element,
      timestamp: new Date(element.timestamp * 1000),
    };
    console.log(JSON.stringify(formatted, null, 2));
  });
};

main();
