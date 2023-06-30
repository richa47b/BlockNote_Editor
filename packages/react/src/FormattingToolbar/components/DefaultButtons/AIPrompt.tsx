import { formatKeyboardShortcut } from "../../../utils";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { ToolbarButton } from "../../../SharedComponents/Toolbar/components/ToolbarButton";
import { BlockNoteEditor, BlockSchema } from "@blocknote/core";
import { useCallback } from "react";

export const AiPrompt = <BSchema extends BlockSchema>(props: {
  editor: BlockNoteEditor<BSchema>;
}) => {
  const nestBlock = useCallback(() => {
    props.editor.focus();
    props.editor.nestBlock();

    const response = fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-/* API Key */",
      },
      body: JSON.stringify({
        model: "text-davinci-003", // AI model used

        max_tokens: 100,
        n: 1,
        temperature: 0,
      }),
    });
    {
      console.log(response, "r");
    }
  }, [props.editor]);

  return (
    <ToolbarButton
      onClick={nestBlock}
      isDisabled={!props.editor.canNestBlock()}
      mainTooltip="Nest Block"
      secondaryTooltip={formatKeyboardShortcut("Tab")}
      icon={RiLightbulbFlashLine}
    />
  );
};
