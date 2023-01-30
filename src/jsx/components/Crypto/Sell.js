import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Dropdown } from "react-bootstrap";

import ExchangeLineChart from "./Exchange/ExchangeLineChart";
import ExchangeLineChart2 from "./Exchange/ExchangeLineChart2";
import LitecoinBarChart from "./Exchange/LitecoinBarChart";
import TicketSoldChart from "./Exchange/TicketSoldChart";
//import icon from src/icons/coin.png;
import bxgicon from "../../../icons/buy and sell/tokenbxg.png";
import usdicon from "../../../icons/buy and sell/usdtt.png";
import bitX from "../../../contractAbis/BitX.json";
import bitXSwap from "../../../contractAbis/BitXGoldSwap.json";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const Sell = () => {
  const [Usd, setUsd] = React.useState(0);

  // create a static value of 0.16130827463
  const [value, setValue] = React.useState(0.166);
  const [totalbxgvalue, settotalBxgvalue] = React.useState(Usd * value);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [addresses, setaddresses] = useState([]);
  const [address, setaddress] = useState();
  const [swap, setswap] = useState();
  const [bitXGold, setbitXGold] = useState();
  //total usdt value

  //create handlesell

  const getSellData = async () => {
    setaddresses(await provider.send("eth_requestAccounts", []));
    setaddress(addresses[0]);
    setswap(new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer));
    setbitXGold(new ethers.Contract(bitX.address, bitX.abi, signer));
  };

  useEffect(() => {
    getSellData();
  }, []);

  const handleSell = async () => {
    try {
      const amount = ethers.utils.parseEther(Usd);
      const bxgApprove = await (
        await bitXGold.approve(bitXSwap.address, amount)
      ).wait();
      if (bxgApprove.events) {
        const tx = await (await swap.swapSell(amount)).wait();
        if (tx.events) {
          toast.success(tx.blockHash, {
            position: "top-center",
            style: { minWidth: 180 },
          });
          // call api
        } else {
          toast.error("Transaction Failed", {
            position: "top-center",
            style: { minWidth: 180 },
          });
        }
      }
    } catch (error) {
      toast.error("Transaction Faileds", {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
  };

  const handleChange = (e) => {
    setUsd(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    settotalBxgvalue(Usd * value);
  }, [Usd]);
  return (
    <>
      <Toaster />
      <div
        className="row "
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div className="col-xl-6" style={{ height: "100%" }}>
          <div className="card">
            <div className="card-body pb-2">
              <br></br>
              <h1 className="text-center no-border font-w600 fs-60 mt-2">
                <span className="text-danger">Sell</span> BXG at the
                <br /> BitxGold with no additional charges
              </h1>
              <h4 className="text-center ">
                Trusted by millions user with over $1 Trillion in crypto
                transactions.
              </h4>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-xl-12">
                  <div className="text-center mt-3 row justify-content-center">
                    <div className="col-xl-12">
                      <div className="row justify-content-center">
                        <div className="col-xl-6">
                          <input
                            onChange={handleChange}
                            type="text"
                            className="form-control mb-3"
                            name="value"
                            placeholder="12"
                            value={Usd}
                          />
                        </div>
                        <div className="col-xl-2">
                          <div className="row">
                            <div
                              style={{ color: "darkgrey" }}
                              type="text"
                              className="custom-react-select form-control mb-3"
                            >
                              <img
                                src={usdicon}
                                width="25"
                                height="25"
                                alt="usdt logo"
                                className="mr-2 mx-2"
                              />{" "}
                              USDT
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 justify-content-center">
                      <div className="row justify-content-center">
                        <div className="col-xl-6">
                          <input
                            disabled={true}
                            type="text"
                            value={totalbxgvalue}
                            className="form-control mb-3"
                            name="value"
                            placeholder=""
                            defaultValue={totalbxgvalue}
                          />
                        </div>
                        <div className="col-xl-2 justify-content-right">
                          <div className="row">
                            <div
                              style={{ color: "darkgrey" }}
                              type="text"
                              className="custom-react-select form-control mb-3"
                            >
                              {" "}
                              <img
                                src={bxgicon}
                                width="30"
                                height="30"
                                alt="bxg logo"
                                className="mr-2 mx-2"
                              />
                              BXG
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br></br>

                  <div className="text-center mt-4 mb-4">
                    <Link
                      onClick={() => {
                        handleSell();
                      }}
                      className="btn btn-warning mr-0 "
                    >
                      SELL NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sell;
