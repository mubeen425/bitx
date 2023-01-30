import React,{useContext, useEffect, useReducer,  useState} from 'react';
import {Link} from 'react-router-dom';
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown, Nav, Tab} from 'react-bootstrap';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
//import MorrisDonught from './Dashboard/MorrisDonught';
import OrderForm from './Dashboard/OrderForm';
//import ServerStatusBar from './Dashboard/ServerStatusBar';
import {LtcIcon, BtcIcon, XtzIcon, EthIcon} from './SvgIcon';

//images
import coin from './../../../images/coin.png';
import metaverse from './../../../images/metaverse.png';


const DashboardComboChart = loadable(() =>
	pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
);
const AssetsChart = loadable(() =>
	pMinDelay(import("./Dashboard/AssetsChart"), 1000)
);

const ServerStatusBar = loadable(() =>
	pMinDelay(import("./Dashboard/ServerStatusBar"), 1000)
);


const pickerData = [
	{fillcolor: 'var(--primary)', datatitle:'XTZ(40%)', price:'763'},
	{fillcolor: '#2A353A', datatitle:'BTC(20%)', price:'321'},
	{fillcolor: '#C0E192', datatitle:'BNB(10%)', price:'69'},
	{fillcolor: '#E085E4', datatitle:'ETH(10%)', price:'154'},
];


const marketBlog = [
	{icon: LtcIcon, classBg: 'bg-success', Name:'LTC', },
	{icon: BtcIcon, classBg: 'bg-warning', Name:'BTC', },
	{icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
	{icon: EthIcon, classBg: 'bg-pink', Name:'ETH', },
	{icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
];

const listData = [
	{}, {}, {},
	{}, {}, {},
	{}, {},{},
	{},{},
];

const Home = () => {
	const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="card bubles">
								<div className="card-body">
									<div className="buy-coin  bubles-down">
										<div>
											<h2>Buy & Sell BXG Instantly</h2>
											{/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p> */}
											<Link to={"/exchange"} className="btn btn-primary">Buy Coin</Link>
										</div>
										<div className="coin-img">
											<img src={coin} className="img-fluid" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<BalanceCardSlider />
						</div>
			
					</div>
				</div>
				{/* <div className="col-xl-4">
					<div className="row">
						<div className="col-xl-12 col-sm-6">
							<div className="card h-auto">
								<div className="card-body px-0 pt-1">
									<Tab.Container defaultActiveKey="Navbuy">
										<div className="">
											<div className="buy-sell">
												<Nav className="nav nav-tabs" eventKey="nav-tab2" role="tablist">
													<Nav.Link as="button" className="nav-link" eventKey="Navbuy" type="button">buy</Nav.Link>
													<Nav.Link as="button" className="nav-link" eventKey="Navsell"  type="button">sell</Nav.Link>
												</Nav>
											</div>
											<Tab.Content  >
												<Tab.Pane  eventKey="Navbuy" >
													<Tab.Container defaultActiveKey="Navbuymarket">
														<div className="limit-sell">
															<Nav  className="nav nav-tabs" id="nav-tab3" role="tablist">
																<Nav.Link as="button"  eventKey="Navbuymarket"  type="button"  >market order</Nav.Link>
																<Nav.Link as="button"  eventKey="Navbuylimit"  type="button" >limit order</Nav.Link>
															</Nav>
														</div>
														<Tab.Content  id="nav-tabContent1">
															<Tab.Pane  eventKey="Navbuymarket"></Tab.Pane>
															<Tab.Pane  eventKey="Navbuylimit"></Tab.Pane>
														</Tab.Content>
														<div className="sell-element">
															<OrderForm />
														</div>	
													</Tab.Container>	
												</Tab.Pane>
												<Tab.Pane eventKey="Navsell">
													<Tab.Container defaultActiveKey="Navsellmarket">
														<div className="limit-sell">
															<Nav className="nav nav-tabs">
																<Nav.Link as="button" eventKey="Navsellmarket"  type="button">market order</Nav.Link>
																<Nav.Link as="button" eventKey="Navselllimit"  type="button" >limit order</Nav.Link>
															</Nav>
														</div>
														<Tab.Content id="nav-tabContent2">
															<Tab.Pane id="Navsellmarket" ></Tab.Pane>
															<Tab.Pane  id="Navselllimit" ></Tab.Pane>														
														</Tab.Content>
														<div className="sell-element">
															<OrderForm />
														</div>	
													</Tab.Container>
												</Tab.Pane>
											</Tab.Content>
										</div>
									</Tab.Container>	
								</div>
							</div>
						</div>
						<div className="col-xl-12 col-sm-6">

							<div className="card">
								<div className="card-header py-2">
									<h2 className="heading">Order Book <span>(BTC/USDT)</span></h2> 
								</div>	
								<div className="card-body pt-0 pb-3 px-2">
									<Tab.Container defaultActiveKey="Openorder">
										<nav className="buy-sell style-1">
											<Nav className=" nav-tabs" id="nav-tab1" role="tablist">
												<Nav.Link as="button"  className="nav-link " eventKey="Openorder"  type="button" >Open Orders</Nav.Link>
												<Nav.Link as="button" className="nav-link" eventKey="Orderhistory" type="button" >Order History</Nav.Link>
											</Nav>
										</nav>
										<Tab.Content>
											<Tab.Pane  eventKey="Openorder" >
												<div className="list-row-head">
													<span>Price</span>
													<span>Size</span>
													<span className="text-end">Total</span>
												</div>
												<div className="list-table danger">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}
												</div>
												<div className="list-bottom-info">
													<h6 className="text-danger mb-0">19858.19 <i className="fa-solid fa-caret-up"></i></h6>
												</div>
												<div className="list-table success">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}													
												</div>
											</Tab.Pane>
											<Tab.Pane  eventKey="Orderhistory" >
												<div className="list-row-head">
													<span>Price</span>
													<span>Size</span>
													<span className="text-end">Total</span>
												</div>
												<div className="list-table danger">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}
												</div>
												<div className="list-bottom-info">
													<h6 className="text-danger mb-0">19858.19 <i className="fa-solid fa-caret-up"></i></h6>
												</div>
												<div className="list-table success">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}													
												</div>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</div>		
						</div>
						
					</div>	
				</div> */}
			</div>		
		</>
	)
}
export default Home;