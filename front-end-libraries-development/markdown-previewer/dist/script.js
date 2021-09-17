class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `# Heading 1
## Heading 2

[Link](#)\n

\`Inline code\`\n

\`\`\`
Block 
code
\`\`\`

- List item 1

Something else.

> Block quote

![](https://i2.wp.com/assets.codepen.io/internal/avatars/users/default.png?ssl=1)

**Something bold**
` };

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "container" }, /*#__PURE__*/
      React.createElement("div", { class: "editor-container" }, /*#__PURE__*/
      React.createElement("div", { id: "editor-title", class: "editor-title" }, "Editor"), /*#__PURE__*/
      React.createElement("textarea", { id: "editor", class: "editor", onChange: this.handleChange.bind(this) }, this.state.value)), /*#__PURE__*/

      React.createElement("div", { class: "preview-container" }, /*#__PURE__*/
      React.createElement("div", { id: "preview-title", class: "preview-title" }, /*#__PURE__*/React.createElement("span", null, "Preview")), /*#__PURE__*/
      React.createElement("div", { id: "preview", class: "preview", dangerouslySetInnerHTML: { __html: marked(this.state.value, { "breaks": true }) } })), /*#__PURE__*/


      React.createElement("footer", null, /*#__PURE__*/
      React.createElement("p", null, "Markdown Editor Preview built with ", /*#__PURE__*/React.createElement("a", { class: "markedjs", href: "https://marked.js.org/", target: "_blank" }, "Marked.js")))));



  }}



ReactDOM.render( /*#__PURE__*/
React.createElement(MarkdownPreviewer, null), document.getElementById('root'));