class SlidesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "current_slide"
    puts "I am connected to the broadcasting server"
  end
end
