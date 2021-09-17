const drums = [
{
  id: 'Heater-1',
  url: '../media/Heater-1.mp3',
  trigger: 'Q' },

{
  id: 'Heater-2',
  url: '../media/Heater-2.mp3',
  trigger: 'W' },

{
  id: 'Heater-3',
  url: '../media/Heater-3.mp3',
  trigger: 'E' },

{
  id: 'Heater-4',
  url: '../media/Heater-4_1.mp3',
  trigger: 'A' },

{
  id: 'Heater-6',
  url: '../media/Heater-6.mp3',
  trigger: 'S' },

{
  id: 'Open-HH',
  url: '../media/Dsc_Oh.mp3',
  trigger: 'D' },

{
  id: "Kick-n'-Hat",
  url: '../media/Kick_n_Hat.mp3',
  trigger: 'Z' },

{
  id: 'Kick',
  url: '../media/RP4_KICK_1.mp3',
  trigger: 'X' },

{
  id: 'Closed-HH',
  url: '../media/Cev_H2.mp3',
  trigger: 'C' }];




class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: false };


    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillMount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(event) {
    const key = event.code.substring(3);

    if (key == this.props.trigger) {
      this.playAudio();
    }


  }

  playAudio() {
    const audio = document.getElementById(this.props.trigger);
    audio.currentTime = 0;
    audio.play();
    this.props.display(this.props.id);

    setTimeout(() => {
      this.setState({
        style: false });

      this.props.style(false);

    }, 100);
    this.setState({
      style: true },
    () => {
    });
    this.props.style(true);


  }

  render() {

    let className = "drum-pad";
    if (this.state.style) {
      className += ' active';
    }

    return /*#__PURE__*/(
      React.createElement("div", { id: this.props.id, className: className, onClick: this.playAudio }, /*#__PURE__*/
      React.createElement("audio", { id: this.props.trigger, className: "clip", src: this.props.url }),
      this.props.trigger));




  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instrument: drums,
      display: "Press a button",
      style: false };

    this.setDisplay = this.setDisplay.bind(this);
    this.setStyle = this.setStyle.bind(this);

  }

  setStyle(style) {
    this.setState({
      style: style });

  }

  setDisplay(displayString) {
    this.setState({
      display: displayString });

  }


  render() {

    let pads = this.state.instrument.map(element => {

      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          id: element.id,
          url: element.url,
          trigger: element.trigger,
          display: this.setDisplay,
          style: this.setStyle }));



    });

    console.log("this.state.style", this.state.style);

    let className;
    if (this.state.display == "Press a button") {
      className = "initial";
    } else if (this.state.style) {
      className = "active";
    } else {
      className = "";
    }

    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" },
      pads, /*#__PURE__*/
      React.createElement("div", { id: "display", className: className }, this.state.display), /*#__PURE__*/
      React.createElement("div", { id: "speaker", className: className })));


  }}



ReactDOM.render( /*#__PURE__*/
React.createElement(App, null), document.getElementById('root'));