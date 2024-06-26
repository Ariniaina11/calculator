const root = document.getElementById('root');

function chunckArray(arr, chunkSize) {
  if (chunkSize <= 0) throw 'Invalid chunk size';

  const res = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }

  return res;
}

const buttonLabels = chunckArray(
  Array.from({length: 10}, (_, i) => i).reverse(),
  3,
).map(chunck => chunck.reverse());

function Button(props) {
  const {className, children, onClick = () => {}} = props;

  return (
    <button className={`calculator-key ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

const operatorLabels = ['+', '-', '*', '÷'];

class App extends React.Component {
  state = {
    output: '0',
  };

  handleClick = value => {
    this.setState(oldState => ({
      ...oldState,
      output: `${oldState.output === '0' ? '' : oldState.output}${value}`,
    }));
  };

  handleReset = () => {
    this.setState({output: '0'});
  };

  handleOperatorClick = operator => {
    const lastChar = this.state.output[this.state.output.length - 1]
    const newOutput = `${operatorLabels.includes(lastChar) ? this.state.output.slice(0, -1) : this.state.output}${operator}`

    this.setState({output: newOutput});
  };

  render() {
    return (
      <div className="calculator">
        <div className="calculator-output">{this.state.output}</div>
        <div className="calculator-keys">
          {operatorLabels.map(operator => (
            <Button
              key={operator}
              className="calculator-key-operator"
              onClick={() => this.handleOperatorClick(operator)}
            >
              {operator}
            </Button>
          ))}

          {buttonLabels.map(row =>
            row.map(label => (
              <Button key={label} onClick={() => this.handleClick(label)}>
                {label}
              </Button>
            )),
          )}
          <Button>.</Button>
          <Button className="calculator-key-reset" onClick={this.handleReset}>
            AC
          </Button>
          <Button className="calculator-key-enter">=</Button>
        </div>
      </div>
    );
  }
}

ReactDOM.createRoot(root).render(<App />);
