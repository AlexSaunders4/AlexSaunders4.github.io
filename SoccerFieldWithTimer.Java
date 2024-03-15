import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SoccerFieldWithTimer {
    private JFrame frame;
    private JPanel pitchPanel;
    private JLabel timerLabel;
    private Date startTime;

    public SoccerFieldWithTimer() {
        // Initialize frame
        frame = new JFrame("Soccer Field with Timer");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        // Initialize pitch panel
        pitchPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                // Draw soccer pitch
                g.setColor(Color.GREEN);
                g.fillRect(0, 0, getWidth(), getHeight());
                g.setColor(Color.WHITE);
                g.drawRect(50, 50, getWidth() - 100, getHeight() - 100);
            }
        };
        pitchPanel.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                // Plot point on click
                int x = e.getX();
                int y = e.getY();
                Graphics g = pitchPanel.getGraphics();
                g.setColor(Color.RED);
                g.fillOval(x, y, 5, 5);
                g.dispose();
                // Get current time
                Date currentTime = new Date();
                long elapsedTime = currentTime.getTime() - startTime.getTime();
                SimpleDateFormat sdf = new SimpleDateFormat("mm:ss");
                String elapsedTimeStr = sdf.format(new Date(elapsedTime));
                System.out.println(String.format("Point plotted at: X = %d, Y = %d, Time: %s", x, y, elapsedTimeStr));
            }
        });

        // Initialize timer label
        timerLabel = new JLabel("Time: 00:00");
        timerLabel.setHorizontalAlignment(SwingConstants.RIGHT);

        // Add components to frame
        frame.add(pitchPanel, BorderLayout.CENTER);
        frame.add(timerLabel, BorderLayout.SOUTH);

        // Set frame size and make visible
        frame.setSize(800, 600);
        frame.setVisible(true);

        // Start timer
        startTime = new Date();
        startTimer();
    }

    private void startTimer() {
        Timer timer = new Timer(1000, e -> {
            long elapsedTime = new Date().getTime() - startTime.getTime();
            SimpleDateFormat sdf = new SimpleDateFormat("mm:ss");
            String elapsedTimeStr = sdf.format(new Date(elapsedTime));
            SwingUtilities.invokeLater(() -> timerLabel.setText("Time: " + elapsedTimeStr));
        });
        timer.start();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(SoccerFieldWithTimer::new);
    }
}
