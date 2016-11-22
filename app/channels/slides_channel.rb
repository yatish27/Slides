class SlidesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "current_slide"
  end

  def get_current_slide
    current_slide = REDIS.get("current_slide")
    ActionCable.server.broadcast "current_slide", { "current_slide"=> current_slide }
  end

  def broadcast_current_slide(data)
    REDIS.set("current_slide", data["current_slide"])
    ActionCable.server.broadcast "current_slide", data
  end
end
