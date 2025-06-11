import { Toaster } from "sonner";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={4000}
        gap={8}
        offset={20}
        toastOptions={{
        //   style: {
        //     background: "#ffffff",
        //     border: "3px solid #e5e7eb",
        //     borderRadius: "0.5rem",
        //     boxShadow:
        //       "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        //     color: "#374151",
        //     fontSize: "14px",
        //     fontWeight: "500",
        //     padding: "12px 16px",
        //   },
          className: "toast-custom",
          descriptionClassName: "toast-description",
          actionButtonStyle: {
            background: "#f59e0b",
            color: "#000000",
            borderRadius: "0.375rem",
            border: "none",
            fontWeight: "500",
            padding: "6px 12px",
            fontSize: "12px",
          },
          cancelButtonStyle: {
            background: "#6b7280",
            color: "#ffffff",
            borderRadius: "0.375rem",
            border: "none",
            fontWeight: "500",
            padding: "6px 12px",
            fontSize: "12px",
          },
        }}
        theme="light"
        // icons={{
        //   success: (
        //     <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-full">
        //       <svg
        //         className="w-3 h-3 text-amber-600"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         stroke="currentColor"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth={2}
        //           d="M5 13l4 4L19 7"
        //         />
        //       </svg>
        //     </div>
        //   ),
        //   error: (
        //     <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
        //       <svg
        //         className="w-3 h-3 text-red-600"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         stroke="currentColor"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth={2}
        //           d="M6 18L18 6M6 6l12 12"
        //         />
        //       </svg>
        //     </div>
        //   ),
        //   warning: (
        //     <div className="flex items-center justify-center w-5 h-5 bg-yellow-100 rounded-full">
        //       <svg
        //         className="w-3 h-3 text-yellow-600"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         stroke="currentColor"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth={2}
        //           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        //         />
        //       </svg>
        //     </div>
        //   ),
        //   info: (
        //     <div className="flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full">
        //       <svg
        //         className="w-3 h-3 text-blue-600"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         stroke="currentColor"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth={2}
        //           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        //         />
        //       </svg>
        //     </div>
        //   ),
        // }}
      />
      <style jsx global>{`
        .toast-custom {
          font-family: inherit;
        }

        .toast-description {
          color: #6b7280;
          font-size: 13px;
          margin-top: 2px;
        }

        /* Success toast styles */
        [data-type="success"] {
          border-left: 4px solid #f59e0b;
        }

        /* Error toast styles */
        [data-type="error"] {
          border-left: 4px solid #ef4444;
        }

        /* Warning toast styles */
        [data-type="warning"] {
          border-left: 4px solid #f59e0b;
        }

        /* Info toast styles */
        [data-type="info"] {
          border-left: 4px solid #3b82f6;
        }

        /* Loading toast styles */
        [data-type="loading"] {
          border-left: 4px solid #6b7280;
        }

        /* Custom loading spinner matching your theme */
        [data-type="loading"] [data-icon] {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default ToastProvider;
