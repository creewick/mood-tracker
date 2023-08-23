import styled from "styled-components";

export default styled.input.attrs(_ => ({
    type: 'range'
}))`
    &::-webkit-slider-runnable-track {
        background-color: ${props => props.color};
        width: 100%;
        height: 40px;
        border-radius: 20px;
        padding: 2px;
        border: 0;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background: #fff;
    }

    & {
        -webkit-appearance: none;
        background: none;
        width: 360px;
        position: relative;
        padding-bottom: 36px;
    }

    &::before {
        content: 'НЕПРИЯТНО';
        left: 10px;
    }

    &::after {
        content: 'ПРИЯТНО';
        right: 10px;
    }

    &::before, &::after {
        position: absolute;
        color: #0006;
        font-size: 14px;
        font-weight: 700;
        top: 50px;
    }
`;