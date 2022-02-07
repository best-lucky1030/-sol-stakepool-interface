export interface Toast {
    message: string;
    segmentClass: 'toastInfo' | 'toastError' | 'toastSuccess';
    toastWithLoader?: boolean;
  }
