/** @jsx jsx */
import { jsx } from 'theme-ui';

type PreparationPanelListItemProps = {
    text: string,
    subtext?: string
}

const PreparationPanelListItem = (props: PreparationPanelListItemProps) => {
    return (
        <li>
            <span>{props.text}</span>
            {(props.subtext)}
                <span>{props.subtext}</span>
            {}}
        </li>
    );
}

export default PreparationPanelListItem;