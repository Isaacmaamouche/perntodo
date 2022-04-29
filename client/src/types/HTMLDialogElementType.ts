/**
 * The DOM interface for the <dialog> element
 */
export default interface HTMLDialogElement extends HTMLElement {
  /**
   * Reflects the open HTML attribute, indicating that the dialog is
   * available for interaction.
   */
  open: boolean;

  /**
   * Gets/sets the return value for the dialog.
   */
  returnValue: string;

  /**
   * Displays the dialog element.
   *
   * @param {(MouseEvent | Element)} anchor The anchor point to which the
   * element will be fixed
   */
  show(anchor?: MouseEvent | Element): void;

  /**
   * Displays the dialog element and makes it the top-most modal dialog.
   * This method honors the autofocus attribute.
   *
   * @param {(MouseEvent | Element)} anchor The anchor point to which the
   * element will be fixed
   */
  showModal(anchor?: MouseEvent | Element): void;

  /**
   * Closes the dialog element.
   * @param {string} returnValue The updated returnValue of the dialog
   */
  close(returnValue?: string): void;
}
