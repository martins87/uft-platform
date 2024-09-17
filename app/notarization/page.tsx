"use client";

import { useState } from "react";

import Container from "../components/Container";
import Icon from "../components/Icon";
import Header from "../components/Header";
import PlainText from "./PlainText";
import File from "./File";
import TxList from "./TxList";
import Pen from "../assets/icons/Pen.svg";
// import Edit from "../assets/icons/Edit";
import PaperClip from "../assets/icons/PaperClip.svg";
import List from "../assets/icons/List.svg";

const Notarization = () => {
  const [card, setCard] = useState(0);

  return (
    <Container>
      <Header
        title="Notarization on-chain"
        subtitle={
          <p>
            Secure your data with a click. No technical skills needed, just
            enter your data
            <br /> and it is registered on the Ethereum blockchain in seconds
          </p>
        }
      />
      <div className="w-full flex gap-6 float-left mb-4">
        {/* <Icon onClick={() => setCard(0)}>
          <Edit />
        </Icon> */}
        <Icon icon={Pen} onClick={() => setCard(0)} />
        <Icon icon={PaperClip} onClick={() => setCard(1)} />
        <Icon icon={List} onClick={() => setCard(2)} />
      </div>
      {card === 0 && <PlainText />}
      {card === 1 && <File />}
      {card === 2 && <TxList />}
    </Container>
  );
};

export default Notarization;
