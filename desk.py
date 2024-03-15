import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mplsoccer.pitch import Pitch
from datetime import datetime, timedelta

class SoccerFieldWithTimer:
    def __init__(self):
        # Initialize pitch
        self.pitch = Pitch(pitch_type='statsbomb', pitch_color='grass', line_color='white')
        self.fig, self.ax = self.pitch.draw()
        self.ax.set_title('Click anywhere on the pitch to plot points')

        # Initialize timer variables
        self.start_time = datetime.now()  # Start time
        self.timer_text = self.ax.text(1, 1, 'Time: 00:00', fontsize=12, ha='right', va='top', transform=self.ax.transAxes)

        # Connect click event
        self.fig.canvas.mpl_connect('button_press_event', self.onclick)

        # Start animation
        self.ani = animation.FuncAnimation(self.fig, self.update, interval=1000)

    def onclick(self, event):
        # Plot the point where the user clicks
        x, y = event.xdata, event.ydata
        self.ax.plot(x, y, 'ro')  # Plot in red
        self.fig.canvas.draw()

        # Get current time (relative to the start time)
        current_time = datetime.now()
        elapsed_time = current_time - self.start_time
        current_time_str = str(elapsed_time).split('.')[0]  # Format time as HH:MM:SS
        print(f'Point plotted at: X = {x:.2f}, Y = {y:.2f}, Time: {current_time_str}')

    def update(self, frame):
        # Update timer every second
        current_time = datetime.now()
        elapsed_time = current_time - self.start_time
        current_time_str = str(elapsed_time).split('.')[0]  # Format time as HH:MM:SS
        self.timer_text.set_text(f'Time: {current_time_str}')

    def show(self):
        plt.show()

if __name__ == '__main__':
    game = SoccerFieldWithTimer()
    game.show()