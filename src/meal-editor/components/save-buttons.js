import SvgIcon from "../../shared/components/ui/icons";

const SaveButtons = ({ saveButton, saveAsButton, isSaving, onSave, onSaveToList }) => {
  return (
    <div className="group min-h-[60px] w-[60px] bg-primary dark:bg-primary-dark rounded-xl border-border dark:border-border-dark border-[1px] fixed right-[calc(((100%-60px)*1/4)+15px)] 2xl:right-[calc(((100%-60px)*1/6)+15px)] bottom-[15px] cursor-pointer transition-[top] overflow-hidden">
      <button
        disabled={!saveButton}
        onClick={onSave}
        className="grid justify-center items-center w-full h-[60px] dark:hover:bg-hover-dark group-hover:max-h-[60px] hover:bg-text-dark transition-[colors,max-height] duration-200 max-h-[0] overflow-hidden fill-text dark:fill-text-dark disabled:fill-icon-color-dark dark:disabled:fill-border-dark dark:disabled:hover:bg-primary-dark disabled:hover:bg-primary"
      >
        <SvgIcon
          icon={isSaving ? "loadingIcon" : "saveIcon"}
          className=" w-[40px] h-[40px]"
        />
      </button>
      <button
        disabled={saveAsButton}
        onClick={() => {
          onSave({ saveAs: true });
        }}
        className="w-full h-[60px] dark:hover:bg-hover-dark group-hover:max-h-[60px] hover:bg-text-dark transition-[colors,max-height] duration-200 max-h-[0] overflow-hidden grid justify-center items-center fill-text dark:fill-text-dark disabled:fill-icon-color-dark dark:disabled:fill-border-dark dark:disabled:hover:bg-primary-dark disabled:hover:bg-primary"
      >
        <SvgIcon
          icon={isSaving ? "loadingIcon" : "saveAsIcon"}
          className="w-[40px] h-[40px]"
        />
      </button>
      <button
        onClick={onSaveToList}
        className="w-full h-[60px] dark:hover:bg-hover-dark hover:bg-text-dark transition-colors duration-300 grid justify-center items-center"
      >
        <SvgIcon
          icon="saveToListIcon"
          className="fill-text dark:fill-text-dark w-[40px] h-[40px]"
        />
      </button>
    </div>
  )
}
export default SaveButtons;