function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "resetApp",








    () => {
      this.setState(this.reset);

    });_defineProperty(this, "setSessionLength",

    newLength => {

      this.setState({
        sessionLength: newLength });


    });_defineProperty(this, "setBreakLength",

    newLength => {

      this.setState({
        breakLength: newLength });


    });_defineProperty(this, "setPlayingState",

    status => {
      this.setState({
        playing: status });

    });this.state = { sessionLength: 25, breakLength: 5, playing: false };this.reset = this.state;}

  render() {

    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement(Timer, {
        sessionLength: this.state.sessionLength * 60,
        breakLength: this.state.breakLength * 60,
        resetApp: this.resetApp,
        playing: this.state.playing,
        setPlayingState: this.setPlayingState }), /*#__PURE__*/

      React.createElement(Settings, {
        sessionLength: this.state.sessionLength,
        breakLength: this.state.breakLength,
        setSessionLength: this.setSessionLength,
        setBreakLength: this.setBreakLength,
        playing: this.state.playing })));




  }}



class Timer extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "formatTime",





























































































    timeInSeconds => {

      let minutes = parseInt(timeInSeconds / 60);
      let seconds = timeInSeconds % 60;

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;

    });this.state = { label: 'Timer', break: false, playing: this.props.playing, breakLength: this.props.breakLength, sessionLength: this.props.sessionLength, started: false };this.reset = this.state;this.timer;this.toggleTimer = this.toggleTimer.bind(this);this.resetTimer = this.resetTimer.bind(this);this.beep = React.createRef();}componentDidUpdate(prevProps, prevState) {if (this.props.sessionLength !== prevProps.sessionLength && !this.state.started) {this.setState({ sessionLength: this.props.sessionLength });}if (this.state.sessionLength === 0 && !this.state.break && this.state.playing) {console.log('play audio');console.log(this.beep.current.duration);this.beep.current.play();}if (this.state.sessionLength === -1 && !this.state.break && this.state.playing) {this.setState({ break: true, label: 'Break', sessionLength: this.props.breakLength });} else if (this.state.sessionLength === -1 && this.state.break) {this.setState({ break: false, label: 'Timer', sessionLength: this.props.sessionLength });}}resetTimer() {this.setState(this.reset);this.props.resetApp();this.beep.current.pause();this.beep.current.currentTime = 0;clearInterval(this.timer);}toggleTimer() {this.setState({ playing: !this.state.playing });if (!this.state.started) {this.setState({ started: true });}this.props.setPlayingState(!this.state.playing);let currentPlaying = !this.state.playing;if (currentPlaying === false) {clearInterval(this.timer);} else {this.timer = setInterval(() => {this.setState({ sessionLength: this.state.sessionLength - 1 });}, 1000);}}

  render() {

    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.label), /*#__PURE__*/
      React.createElement("div", { id: "time-left", className: this.state.started && !this.state.playing ? "paused" : "" }, this.formatTime(this.state.sessionLength)), /*#__PURE__*/
      React.createElement("div", { id: "start_stop", className: this.state.playing ? "playing" : "", onClick: this.toggleTimer }, this.state.playing ? '\u23F8' : '\u23F5'), /*#__PURE__*/
      React.createElement("div", { id: "reset", onClick: this.resetTimer }, "\u21BA"), /*#__PURE__*/
      React.createElement("audio", { id: "beep", ref: this.beep, src: "../media/beep.mp3" }))));





  }}




class Setting extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleMouseDown",







































    event => {

      console.log(event.target.id);

      if (this.props.value === 1 && event.target.id.includes('decrement') || this.props.value === 60 && event.target.id.includes('increment')) {
        this.settingLength.current.classList.add("limit-cue");
      }

    });_defineProperty(this, "handleMouseUp",

    event => {

      if (this.settingLength.current.classList.contains("limit-cue")) {
        this.settingLength.current.classList.remove("limit-cue");
      }


    });this.decrement = this.decrement.bind(this);this.increment = this.increment.bind(this);this.settingLength = React.createRef();}decrement() {const value = this.props.value - 1;if (this.props.value > 1) {if (event.target.id === 'session-decrement') {this.props.setSessionLength(value);} else if (event.target.id === 'break-decrement') {this.props.setBreakLength(value);}} else {console.log("Can't decrement.");}}increment() {const value = this.props.value + 1;if (this.props.value < 60) {if (event.target.id === 'session-increment') {this.props.setSessionLength(value);} else if (event.target.id === 'break-increment') {this.props.setBreakLength(value);}}}

  render() {

    console.log(this.props);

    return /*#__PURE__*/(

      React.createElement("div", { id: "setting" }, /*#__PURE__*/
      React.createElement("div", { id: this.props.label }, this.props.name), /*#__PURE__*/
      React.createElement("div", { id: this.props.id.toString() + "-length", className: this.props.value === 1 || this.props.value === 60 ? "bottom-limit" : "", ref: this.settingLength }, this.props.value), /*#__PURE__*/
      React.createElement("div", { id: this.props.id.toString() + "-decrement", onClick: this.decrement, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onTouchStart: this.handleMouseDown, onTouchEnd: this.handleMouseUp }, "-"), /*#__PURE__*/
      React.createElement("div", { id: this.props.id.toString() + "-increment", onClick: this.increment, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onTouchStart: this.handleMouseDown, onTouchEnd: this.handleMouseUp }, "+")));




  }}



class Settings extends React.Component {
  constructor(props) {
    super(props);
  }


  getAvailableSettingsArray() {

    const availableSettingsJSON = [

    { "id": "break",
      "label": "break-label",
      "name": "Break Length",
      "value": this.props.breakLength },

    { "id": "session",
      "label": "session-label",
      "name": "Session Length",
      "value": this.props.sessionLength }];




    const availableSettings = [];

    for (const setting of availableSettingsJSON) {



      availableSettings.push( /*#__PURE__*/React.createElement(Setting, {
        id: setting.id,
        label: setting.label,
        name: setting.name,
        value: setting.value,
        setSessionLength: this.props.setSessionLength,
        setBreakLength: this.props.setBreakLength,
        playing: this.props.playing }));


    }

    return /*#__PURE__*/(
      React.createElement("div", { id: "settings" }, availableSettings));


  }


  render() {

    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", null,
      this.getAvailableSettingsArray())));





  }}




ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));