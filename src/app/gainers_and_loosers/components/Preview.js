import React from "react";

const Preview = ({ isLoading }) => {
  if (isLoading) {
    return (
      <>
        <h1 href={"/gainers_and_loosers"}>
          Gainers and losers
        </h1>
        loading...
        <ContainerPreview>
          <Card
            name={"loading"}
            price={"..."}
            changePercent={"..."}
            changeCurrency={"..."}
            up={true}
          />

          <Card
            name={"loading"}
            price={"..."}
            changePercent={"..."}
            changeCurrency={"..."}
            up={false}
          />
        </ContainerPreview>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1 href={"/gainers_and_loosers"}>
          Gainers and losers
        </h1>
        error
      </>
    );
  }
  return <></>;
};

export default Preview;
