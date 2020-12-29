/** @jsx jsx */
import { jsx, Container } from 'theme-ui';

type PreparationPanelListItemProps = {
    text: string,
    subtext?: string
}

const PreparationPanelListItem = (props: PreparationPanelListItemProps) => {
    return (
        <li>
            <span>{props.text}</span>
            <p>{props.subtext}</p>
        </li>
    );
}

export default PreparationPanelListItem;