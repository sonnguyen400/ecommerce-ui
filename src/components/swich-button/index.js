import { memo, useRef } from "react";
import styled from "styled-components";
const Note = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    padding: 2px;
    height: 100%;
    transition: all 1s linear;
    span {
        display: block;
        left: calc(3 / 4);
        top: 0px;
        aspect-ratio: 1/1;
        height: 100%;
        border-radius: 50%;
        background-color: white;
        z-index: 0;
    }
`;
const Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;
const SwitchContainer = styled.div`
    min-width: 3rem;
    border-radius: 1.5rem;
    aspect-ratio: 7/4;
    position: relative;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    input[type="checkbox"] {
        position: absolute;
        z-index: 1;
        opacity: 0;
        width: 100%;
        height: 100%;
        &:checked {
            ~ ${Note} {
                left: unset;
                right: 0;
            }
        }
    }
`;

function Switch({ onChange, checked }) {
    return (
        <SwitchContainer>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <Note>
                <span></span>
            </Note>
        </SwitchContainer>
    );
}

export default memo(Switch);
