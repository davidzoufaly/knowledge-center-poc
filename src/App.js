import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import test from "./test.md";
// styling can be done via pseudoselectors OR attribute selection
import "./App.css";

const findAllH3UnderH2 = function () {
  const nodeList = document.querySelector("main")?.childNodes;
  const arr = nodeList ? Array.from(nodeList) : [];
  let lastAvH2Index = null;
  let countOfH2 = 0;
  let countOfH3 = 0;
  return function () {
    return arr.reduce((acc, val, i) => {
      if (val.nodeName === "H2") {
        val.id = `h2-${countOfH2}`;
        lastAvH2Index = i;
        acc[i] = { mainTitle: val, secondTitles: [] };
        countOfH2++;
      }

      if (val.nodeName === "H3") {
        val.id = `h3-${countOfH3}`;
        acc[lastAvH2Index] = {
          ...acc[lastAvH2Index],
          secondTitles: [...acc[lastAvH2Index].secondTitles, val],
        };
        countOfH3++;
      }
      return acc;
    }, []).filter(Boolean)
  };
};

function App() {
  const [mdFile, setMdFile] = useState();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(test)
      .then((response) => response.text())
      .then((text) => {
        setMdFile(text);
      });
  }, []);

  useEffect(() => {
    setMenuItems(findAllH3UnderH2()());
  }, [mdFile]);

  // Id and link should be contained from h2 innerText -> we can use our stringMethods for transforming to correct notation
  const menu = (
    <ul>
      {Object.values(menuItems).map((item, index) => (
        <li key={item.mainTitle.id}>
          <a href={`#h2-${index}`}>{item.mainTitle.innerText}</a>
          <ul>
            {item.secondTitles.map((secondItem) => (
              <li key={secondItem.id}>
                <a href={`#${secondItem.id}`}>{secondItem.innerText}</a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav>
        <p>menu</p>
        {menu}
      </nav>
      <p>content</p>
      <main>
        <ReactMarkdown children={mdFile} />
      </main>
    </>
  );
}

export default App;
