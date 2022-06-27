import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import test from "./test.md";
// styling can be done via pseudoselctors
import "./App.css";

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
    const menuItemsArray = Array.from(document.querySelectorAll("h2"));
    setMenuItems(menuItemsArray);
    // assign id as anchor for menu link
    menuItemsArray.forEach((item, i) => (item.id = `h2-${i}`));
  }, [mdFile]);

  // Id and link should be contained from h2 innerText -> we can use our stringMethods for transforming to correct notation
  const menu = (
    <ul>
      {menuItems.map((item, index) => (
        <li key={item.innerText}>
          <a href={`#h2-${index}`}>{item.innerText}</a>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    console.log("mdFile: ", mdFile);
  }, [mdFile]);

  return (
    <>
      <nav>
        <p>menu</p>
        {menu}
      </nav>
      <main>
        <p>content</p>
        <ReactMarkdown children={mdFile} />
      </main>
    </>
  );
}

export default App;
