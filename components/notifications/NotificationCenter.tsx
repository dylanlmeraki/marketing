import React, { useState } from "react";
import { apiClient } from "@/components/utils/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  FileText,
  CheckCircle,
  XCircle,
  MessageSquare,
  UserPlus,
  Mail,
  AlertCircle,
  Loader2,
  LucideIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import type { Notification, User } from "@/types";

type NotificationIconType =
  | "document_upload"
  | "milestone_approval"
  | "milestone_rejected"
  | "change_order_approval"
  | "change_order_rejected"
  | "new_message"
  | "proposal_sent"
  | "user_signup"
  | "contact_form"
  | "consultation_form"
  | "project_update";

interface ExtendedNotification extends Notification {
  read?: boolean;
  read_at?: string;
  created_date?: string;
  recipient_email?: string;
  priority?: "normal" | "urgent";
}

interface NotificationCenterProps {
  user?: User | null;
}

const notificationIcons: Record<NotificationIconType, LucideIcon> = {
  document_upload: FileText,
  milestone_approval: CheckCircle,
  milestone_rejected: XCircle,
  change_order_approval: CheckCircle,
  change_order_rejected: XCircle,
  new_message: MessageSquare,
  proposal_sent: FileText,
  user_signup: UserPlus,
  contact_form: Mail,
  consultation_form: Mail,
  project_update: AlertCircle,
};

const notificationColors: Record<NotificationIconType, string> = {
  document_upload: "text-blue-600",
  milestone_approval: "text-green-600",
  milestone_rejected: "text-red-600",
  change_order_approval: "text-green-600",
  change_order_rejected: "text-red-600",
  new_message: "text-cyan-600",
  proposal_sent: "text-purple-600",
  user_signup: "text-indigo-600",
  contact_form: "text-orange-600",
  consultation_form: "text-orange-600",
  project_update: "text-yellow-600",
};

export default function NotificationCenter({ user }: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery<
    ExtendedNotification[]
  >({
    queryKey: ["notifications", user?.email],
    queryFn: async (): Promise<ExtendedNotification[]> => {
      if (!user) return [];
      const result = await apiClient.entities.Notification.filter(
        { recipient_email: user.email },
        "-created_date",
        50,
      );
      return result as ExtendedNotification[];
    },
    enabled: !!user,
    refetchInterval: 30000,
  });

  const unreadCount = notifications.filter(
    (n: ExtendedNotification) => !n.read && !n.isRead,
  ).length;

  const markAsReadMutation = useMutation({
    mutationFn: async (
      notificationId: string,
    ): Promise<Notification | null> => {
      return await apiClient.entities.Notification.update(notificationId, {
        isRead: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const unread = notifications.filter(
        (n: ExtendedNotification) => !n.read && !n.isRead,
      );
      await Promise.all(
        unread.map((n: ExtendedNotification) =>
          apiClient.entities.Notification.update(n.id, {
            isRead: true,
          }),
        ),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const getNotificationIcon = (type: string): LucideIcon => {
    return notificationIcons[type as NotificationIconType] || Bell;
  };

  const getNotificationColor = (type: string): string => {
    return notificationColors[type as NotificationIconType] || "text-gray-600";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative">
          <Bell className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => markAllAsReadMutation.mutate()}
                disabled={markAllAsReadMutation.isPending}
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification: ExtendedNotification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                const isRead = notification.read || notification.isRead;
                const createdDate =
                  notification.created_date || notification.createdAt;

                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${colorClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          {notification.priority === "urgent" && (
                            <Badge
                              variant="destructive"
                              className="bg-red-100 text-red-700 text-xs"
                            >
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {createdDate &&
                              format(new Date(createdDate), "MMM d, h:mm a")}
                          </span>
                          <div className="flex gap-2">
                            {notification.link && (
                              <Link
                                to={notification.link}
                                onClick={() => setOpen(false)}
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs h-7 px-2"
                                >
                                  View
                                </Button>
                              </Link>
                            )}
                            {!isRead && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-7 px-2"
                                onClick={() =>
                                  markAsReadMutation.mutate(notification.id)
                                }
                                disabled={markAsReadMutation.isPending}
                              >
                                Mark read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
