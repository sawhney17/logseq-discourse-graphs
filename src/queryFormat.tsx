import React, { FC, useEffect, useState } from "react";
import { render } from "react-dom";
import { returnedQuery, returnQueries } from "./utils";
const QueryFormat = () => {
  const [sections, setSections] = useState([]);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    returnQueries().then((queries) => {
      setSections(queries);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
        <tr>
          <td>Connection</td>
          <td>Page</td>
        </tr>
        </thead>
      
        {sections.map((section, index) => {
          if (section.value.length != 0) {
            console.log(sections);
            return (
              // <div>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      setResponses(index);
                    }}
                  >
                    {section.connection}
                  </button>
                </td>

                {index == null
                  ? "Check out Discourse Connections here!"
                  : sections[index].value.map((response, index) => {
                      return (
                        <button
                          onClick={() => {
                            logseq.App.pushState("page", response);
                          }}
                          className="block"
                        >
                          <a>{response.name}</a>
                        </button>
                      );
                    })}
              </tr>
              //</div>
            );
          }
        })}
      </table>

    </div>
  );
};

export default QueryFormat;
