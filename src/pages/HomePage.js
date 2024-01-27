import { Card, Flex } from 'antd';
import volleyImage from '../assets/img/volleyball.jpg'
import { useNavigate, Link } from "react-router-dom";
import './Pages.css'

const { Meta } = Card;

function HomePage() {
    const navigate = useNavigate();

    return (
        <Flex vertical align="center" style={{textAlign:'-webkit-center'}}>
            <Link to={'/volleyball-matches/new-match'}>
                <Card
                    style={{ width: '75%', marginTop: '10%' }}
                    cover={
                    <img
                        alt="example"
                        src={volleyImage}
                    />
                    }
                >
                    <h3 style={{margin:'0px'}}>Nuevo partido</h3>
                </Card>
            </Link>
        </Flex>
    )
    
}

export default HomePage;