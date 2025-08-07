using BusReservationNET.Models;
using Microsoft.EntityFrameworkCore;

namespace BusReservationNET.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BusContext _context;

        public UserRepository(BusContext context)
        {
            _context = context;
        }

        public async Task<User> AddAgentAsync(User user)
        {
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAgentsAsync()
        {
            return await _context.Users
                .Where(u => u.Role == "ROLE_AGENT")
                .ToListAsync();
        }

        public async Task<User> AddUserAsync(User user)
        {
            user.Role = Role.ROLE_CUSTOMER.ToString();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(long id, User user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null) return null;

            existingUser.Name = user.Name;
                        existingUser.Email = user.Email;
            existingUser.Contact = user.Contact;
            existingUser.Address = user.Address;
            existingUser.Role = user.Role = Role.ROLE_CUSTOMER.ToString();

            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<List<User>> GetAllCustomersAsync()
        {
            return await _context.Users
               .Where(u => u.Role == "ROLE_CUSTOMER")
               .ToListAsync();
        }

        public async Task<User> GetByIdAsync(long id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public User GetById(long userId)
        {
            return _context.Users.FirstOrDefault(t => t.Id == userId);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<User> RegisterUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}

