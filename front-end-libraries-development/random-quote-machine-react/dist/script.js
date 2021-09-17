class QuoteViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      error: null,
      isLoaded: false,
      prevQuotes: [],
      position: 0,
      condition: false };

  }


  getNewQuote() {
    return fetch("https://cors.bridged.cc/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en").
    then(response => response.json());
  }

  getPrevQuoteInTheArr() {
    if (this.state.position > 0) {
      this.setState({
        position: this.state.position - 1,
        quote: this.state.prevQuotes[this.state.position - 1].quote,
        author: this.state.prevQuotes[this.state.position - 1].author });

    } else {
      alert("start of the list");
    }
  }

  getNextQuote() {
    if (this.state.position < this.state.prevQuotes.length - 1) {
      this.setState({
        position: this.state.position + 1,
        quote: this.state.prevQuotes[this.state.position + 1].quote,
        author: this.state.prevQuotes[this.state.position + 1].author });

    } else {
      // alert("end of the list")
    }

  }

  getRandomColor() {
    function random() {
      return Math.floor(Math.random() * 200);
    }

    var random360 = function () {
      return Math.floor(Math.random() * 360);
    };

    function randomRgb() {
      return `rgb(${random()}, ${random()}, ${random()})`;
    }

    var linear = `linear-gradient(${random360()}deg, ${randomRgb()}, ${randomRgb()})`;
    return randomRgb();
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.getRandomColor();
    this.setState({
      isLoaded: false,
      condition: !this.state.condition });

    this.getNewQuote().then(response => {
      if (this.state.prevQuotes.length == 0 || this.state.prevQuotes[this.state.position].quote != response.quoteText) {

        this.setState(prevState => ({
          isLoaded: true,
          quote: response.quoteText,
          author: response.quoteAuthor,
          prevQuotes: [...this.state.prevQuotes,
          { "quote": response.quoteText,
            "author": response.quoteAuthor }],
          position: this.state.prevQuotes.length }));

      } else {
        this.componentDidMount();
      }
    },
    error => {
      this.componentDidMount();
    });

  }

  render() {
    if (this.state.error) {
      return /*#__PURE__*/React.createElement("div", null, "Error: ", this.state.error.message);
    } else if (!this.state.isLoaded) {
      return /*#__PURE__*/(
        React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
        React.createElement("p", { id: "author" }, "Loading..."), /*#__PURE__*/
        React.createElement("span", { id: "empty-space" }), /*#__PURE__*/
        React.createElement("div", { className: "buttons", id: "buttons" }, /*#__PURE__*/
        React.createElement("button", { disabled: true }, "Prev. Quote"), /*#__PURE__*/
        React.createElement("button", { disabled: true }, "New Quote"), /*#__PURE__*/
        React.createElement("button", { disabled: true }, "Next Quote"), /*#__PURE__*/
        React.createElement("a", { id: "tweet-quote", onMouseOver: ({ target }) => target.style.cursor = 'not-allowed' }, "Tweet Quote"))));



    } else {
      return (
        [/*#__PURE__*/React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
        React.createElement("p", { id: "text" }, "\u201C", this.state.quote, "\u201D"),
        console.log(this.state.condition), /*#__PURE__*/
        React.createElement("p", { id: "author" }, "\u2014 ", this.state.author ? this.state.author : "Unknown author"), /*#__PURE__*/
        React.createElement("span", { id: "empty-space" }), /*#__PURE__*/
        React.createElement("div", { id: "buttons", className: "buttons" }, /*#__PURE__*/
        React.createElement("button", { disabled: this.state.position < 1 ? true : false, onClick: this.getPrevQuoteInTheArr.bind(this), onMouseOver: ({ target }) => target.style.color = document.body.style.backgroundColor, onMouseOut: ({ target }) => target.style.color = '#FFF' }, "Prev. Quote"), /*#__PURE__*/
        React.createElement("button", { id: "new-quote", onClick: this.componentDidMount.bind(this), onMouseOver: ({ target }) => target.style.color = document.body.style.backgroundColor, onMouseOut: ({ target }) => target.style.color = '#FFF' }, "New Quote"), /*#__PURE__*/
        React.createElement("button", { disabled: this.state.position >= this.state.prevQuotes.length - 1 ? true : false, onClick: this.getNextQuote.bind(this), onMouseOver: ({ target }) => target.style.color = document.body.style.backgroundColor, onMouseOut: ({ target }) => target.style.color = '#FFF' }, "Next Quote"), /*#__PURE__*/
        React.createElement("a", { id: "tweet-quote", href: "https://twitter.com/intent/tweet?text=" + this.state.quote, onMouseOver: ({ target }) => target.style.color = document.body.style.backgroundColor, target: "_blank", onMouseOut: ({ target }) => target.style.color = '#FFF' }, "Tweet Quote")))]);



    }
  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(QuoteViewer, null),
document.getElementById('root'));