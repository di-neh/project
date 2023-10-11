import styled from "styled-components";
import logo from  "../ToDo/statics/копик.jpg";

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
`

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
`
const Box1 = styled.div`
  margin-top: 8px;
  margin-left: 400px;
  font-size: 24px;
`
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`

const Avatar = styled.div`
  margin-left: 5px;
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
`

const Header = () => {
    return (
        <Wrapper>
            <Box1>Хуй</Box1>
            <Box2>
                <div>
                    <div style={{fontSize:10}}>Kapibara@mail.ru</div>
                    <div>Шляпа Усатая</div>
                </div>
                <Avatar>
                    <AvatarImg src={logo}></AvatarImg>
                </Avatar>


            </Box2>
        </Wrapper>
    );
};

export default Header;
