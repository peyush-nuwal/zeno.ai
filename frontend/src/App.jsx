
import  { useEffect, useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; 
import Editor from "react-simple-code-editor"
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"
import { reviewCode } from "./utils/axios";
import Markdown from "react-markdown";
import Split from "react-split";

function App() {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`
            function sum()=>{
            return 1+b
            }
            `);

            
  useEffect(() => {
     prism.highlightAll()
  }, [])

  const handleReview = async () => {
    setLoading(true);
    setReview("");
    try {
      const res = await reviewCode(code);
      setReview(res.data);
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <main className="h-screen w-screen  flex gap-2 px-8 py-5 text-gray-100">
      <Split
        className="flex h-full w-full gap-2"
        sizes={[40, 60]}
        minSize={400}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className="relative  bg-black rounded-2xl  resize">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "5px",
              fontSize: 18,
            }}
          />
          {!loading && (
            <button
              onClick={handleReview}
              className="absolute bottom-5 right-5 btn btn-primary"
            >
              Review
            </button>
          )}
        </div>

        <div className="relative bg-[#343434]  rounded-2xl   p-5 overflow-y-auto  text-wrap text-xl ">
          {loading && (
            <div className="loadingspinner ">
              <div id="square1"></div>
              <div id="square2"></div>
              <div id="square3"></div>
              <div id="square4"></div>
              <div id="square5"></div>
            </div>
          )}
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {typeof review === "string" ? review : ""}
          </Markdown>
        </div>
      </Split>
    </main>
  );
}

export default App
