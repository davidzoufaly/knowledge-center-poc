import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import test from "./test.md";
// styling can be done via pseudoselectors OR attribute selection
import "./App.css";

const findAllH3UnderH2 = () => {
  const arr = Array.from(document.querySelector("main").childNodes);
  let lastAvH2Index = null;
  let countOfH2 = 0;
  let countOfH3 = 0;

  return arr.reduce((acc, val, i) => {
    if (val.nodeName === "H2") {
      countOfH2++;
      val.id = `h3-${countOfH2}`;
      lastAvH2Index = i;
      acc[i] = { mainTitle: val, secondTitles: [] };
    }

    if (val.nodeName === "H3") {
      countOfH3++;
      val.id = `h3-${countOfH3}`;
      acc[lastAvH2Index] = {
        ...acc[lastAvH2Index],
        secondTitles: [...acc[lastAvH2Index].secondTitles, val],
      };
    }

    return acc;
  }, []);
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
    setMenuItems(findAllH3UnderH2());
    console.log(Object.values(findAllH3UnderH2()));
  }, [mdFile]);

  // Id and link should be contained from h2 innerText -> we can use our stringMethods for transforming to correct notation
  const menu = (
    <ul>
      {Object.values(menuItems).map((item, index) => (
        <li key={item.mainTitle.innerText}>
          <a href={`#h2-${index}`}>{item.mainTitle.innerText}</a>
          <ul>
            {item.secondTitles.map((secondItem) => (
              <li>
                <a href={`#h3-${index}`}>{secondItem.innerText}</a>
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
