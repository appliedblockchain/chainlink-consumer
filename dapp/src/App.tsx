import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { ConnectWallet } from "./components/ConnectWallet";
import { Loading } from "./components/Loading";
import Navbar from "./components/Navbar";
import APIConsumer from "./features/APIConsumer";
import Home from "./features/Home";
import PriceConsumer from "./features/PriceConsumer";
import VRF from "./features/VRF";
import { BlockchainContext } from "./providers/BlockchainProvider";

function App() {
  const {
    connectWallet,
    isConnectingWallet,
    selectedAddress,
    networkError,
    dismissNetworkError,
  } = useContext(BlockchainContext);

  if (isConnectingWallet) {
    return <Loading />;
  }

  if (!selectedAddress || networkError) {
    return (
      <ConnectWallet
        connectWallet={connectWallet}
        networkError={networkError}
        dismiss={dismissNetworkError}
      />
    );
  }

  return (
    <Router>
      <div>
        <Navbar address={selectedAddress} />

        <Container>
          <Row>
            <Col className="pt-3">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/price-consumer">
                  <PriceConsumer />
                </Route>
                <Route path="/vrf">
                  <VRF />
                </Route>
                <Route path="/api-consumer">
                  <APIConsumer />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
