import MapleFooterComponent from "./components/common/footer.components";
import MapleHeaderComponent from "./components/common/header.components";
import TaskBoard from "./components/task-board.components";

const App = () => {
  return (
    <>
      <MapleHeaderComponent />
      <TaskBoard />
      <MapleFooterComponent />
    </>
  );
};

export default App;
