
import styles from './tooltip.module.scss'

const Tooltip = ({children}) => {
    

    return (
        <div className={styles.tooltipWrapper}>
            
            <div className = {styles.tooltip}>
            {/* <div> */}
                {children}
            </div>
        
        </div>
    );
};

export default Tooltip