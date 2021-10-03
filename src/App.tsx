import './styles/index.scss';
import Button from './components/Button/button';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          onClick={(e) => {
            e.preventDefault();
            alert('click');
          }}
        >
          Hello
        </Button>
        <Button disabled>Disabled Button</Button>
      </header>
    </div>
  );
}

export default App;
