import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    temErro: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #666360;

    & + div {
        margin-top: 8px;
    }

    ${props => props.temErro && css`
        border-color: #c53030;
    `}

    ${props => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${props => props.isFilled && css`
        color: #ff9000;
    `}

    input {
        background: #232129;
        color: #F4EDE8;
        border: 0;
        flex: 1;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 12px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;

    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
