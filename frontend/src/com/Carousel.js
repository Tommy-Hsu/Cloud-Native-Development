import { Carousel,Layout } from 'antd';

const { Content } = Layout;
const contentStyle = {
    width: '70%', // 设定宽度为100%
    height: '700px', // 设定高度为500像素
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    margin: 'auto',
    // background: '#364d79',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url('https://i.imgur.com/zYsCYkW.jpeg')`,
    // backgroundImage: `url('https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
};
const App = () => (
<Content style={{ width: '70%',margin: 'auto',justifyContent: 'center', }}>
  <Carousel autoplay>
    <div>
      {/* <h3 style={contentStyle('https://i.imgur.com/7qAEv6W.jpg')}></h3> */}
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
    <div>
      <h3 style={contentStyle}></h3>
    </div>
  </Carousel>
</Content>
);
export default App;