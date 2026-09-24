import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
          <div className="flex w-full max-w-2xl flex-col items-center p-4 sm:p-8">
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              size={48}
              className="mb-6 shrink-0 text-destructive"
            />

            <h2 className="mb-4 text-center text-xl font-semibold">
              An unexpected error occurred.
            </h2>

            <div className="mb-6 max-h-[50vh] w-full overflow-auto rounded-xl bg-muted p-4">
              <pre className="whitespace-pre-wrap wrap-break-words text-sm text-muted-foreground">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-lg px-4 py-2",
                "bg-primary text-primary-foreground",
                "transition-opacity duration-200",
                "hover:opacity-90",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-primary",
                "focus-visible:ring-offset-2",
                "cursor-pointer"
              )}
            >
              <Icon
                icon="solar:refresh-bold"
                size={16}
              />

              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
