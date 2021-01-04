/** @jsx jsx */
import { jsx, Container } from 'theme-ui';

type PreparationPanelListItemProps = {
    text: string,
    subtext?: string
}

const PreparationPanelListItem = (props: PreparationPanelListItemProps) => {
    return (
        <li sx={{
            listStyleImage: 'url("/icons/List box.svg")',
            paddingLeft: '17px',
            paddingBottom: '24px'
        }}>
            <p sx={{
                fontSize: ['bodyMobile', 'body'],
                lineHeight: ['bodyMobile', 'body']
            }}>{props.text}</p>
            <p sx={{
                color: '#6A6A6A',
                fontSize: '16px'
            }}>{props.subtext}</p>
        </li>
    );
}

export default PreparationPanelListItem;
