
import styled from 'styled-components';

const TestBox = styled.div`
    height: 100px;
    width: 100px;
    background: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    transform: ${props => `translateX(${props.positionX || 0}px) translateY(${props.positionY || 0}px)`};
    transition: all 0.016s;
    will-change: transform;
    opacity: .4;
    z-index: 100000;
`

export default TestBox