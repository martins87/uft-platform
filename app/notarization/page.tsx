"use client";

import { useState } from "react";

import Container from "../components/Container";
import Icon from "../components/Icon";
import Pen from "../assets/icons/Pen.svg";
import PaperClip from "../assets/icons/PaperClip.svg";
import List from "../assets/icons/List.svg";
import PlainText from "./PlainText";
import File from "./File";
import TxList from "./TxList";
import Header from "./Header";

const Notarization = () => {
  const [card, setCard] = useState(0);

  return (
    <Container>
      <Header />
      <div className="w-[80%] md:w-full flex gap-6 float-left mb-4">
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
