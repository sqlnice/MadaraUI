import './styles/index.scss';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
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
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          Normal Link
        </Button>
        <Button btnType={ButtonType.Link} disabled href="www.baidu.com">
          Disabled Link
        </Button>
      </header>
    </div>
  );
}

export default App;
