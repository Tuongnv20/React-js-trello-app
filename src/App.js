import './App.scss';

function App() {
  return (
    <div className="trello-master">
      <nav className='navbar app'>App bar</nav>
      <nav className='navbar board'>Board bar</nav>
      <div className='board-columns'>

        <div className='column'>
          <header>BrainStorm</header>
          <ul>
            <li>
              <img src='https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png' />
              Design and Research
            </li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>


            <footer>Add another card</footer>
          </ul>
        </div>

        <div className='column'>
          <header>Two</header>
          <ul>
            <li>
              <img src='https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png' />
              Design and Research
            </li>
            <li>Hello</li>
            <footer>Add another card</footer>
          </ul>
        </div>

        <div className='column'>
          <header>Three</header>
          <ul>
            <li>
              <img src='https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png' />
              Design and Research
            </li>
            <li>Hello</li>
            <footer>Add another card</footer>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
