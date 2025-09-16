import Stocks from "@/modules/stocks/Stocks";

export const metadata = {
  title: "Stocks management",
  description: "Here you can manage all your stocks",
};

const Page = () => {
  return <Stocks />;
};

export default Page;
