import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message, description = null) => {
    toast.success(message, {
      description,
    });
  };

  const showError = (message, description = null) => {
    toast.error(message, {
      description,
    });
  };

  const showWarning = (message, description = null) => {
    toast.warning(message, {
      description,
    });
  };

  const showInfo = (message, description = null) => {
    toast.info(message, {
      description,
    });
  };

  const showLoading = (message, description = null) => {
    return toast.loading(message, {
      description,
    });
  };

  const showPromise = (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Something went wrong!",
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    promise: showPromise,
    dismiss,
    dismissAll,
  };
};

export const toast_success = (message, description) =>
  toast.success(message, { description });
export const toast_error = (message, description) =>
  toast.error(message, { description });
export const toast_warning = (message, description) =>
  toast.warning(message, { description });
export const toast_info = (message, description) =>
  toast.info(message, { description });
export const toast_loading = (message, description) =>
  toast.loading(message, { description });
